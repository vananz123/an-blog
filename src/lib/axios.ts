import { END_POINTS } from "@/constants/constants";
import { getAuthFromLS, removeAuthFromLS, setAuthToLS } from "@/lib/auth";
import { isAxiosExpiredTokenError, isAxiosUnauthoriedError } from "@/lib/utils";
import { AuthResponse } from "@/services/server/auth/type";
import ErrorResponse from "@/types/error.response.type";
import axios, { AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance;
  accessToken: string;
  refreshToken: string;
  clientId:string;
  private refreshTokenRequest: Promise<string> | null;
  constructor() {
    const authStore = getAuthFromLS()
    this.accessToken = authStore.accessToken;
    this.refreshToken = authStore.refreshToken;
    this.clientId = authStore.clientId;

    this.refreshTokenRequest = null;
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_API,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        "x-client-id":"",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `${this.accessToken}`;
          config.headers['x-client-id'] = `${this.clientId}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    this.instance.interceptors.response.use(
      (response) => {
        if (response.config.url === END_POINTS.LOGIN) {
          this.accessToken = (response.data as AuthResponse).metadata.tokens.accessToken;
          this.refreshToken = (response.data as AuthResponse).metadata.tokens.refreshToken;
        } else if (response.config.url === END_POINTS.LOGOUT) {
          this.accessToken = "";
          this.refreshToken = "";
        }
        return response;
      },
      (error) => {
        // if (isAxiosUnauthoriedError(error)) {
        //   this.accessToken = "";
        //   this.refreshToken = "";
        //   removeTokenFromLS();
        // }
        // if (
        //   isAxiosExpiredTokenError<ErrorResponse<undefined>>(error) &&
        //   error.config?.url !== END_POINTS.URL_REFRESH_TOKEN
        // ) {
        //   this.refreshTokenRequest = this.refreshTokenRequest
        //     ? this.refreshTokenRequest
        //     : this.handleRefreshToken().finally(() => {
        //         setTimeout(() => {
        //           this.refreshTokenRequest = null;
        //         }, 10000);
        //       });
        //   return this.refreshTokenRequest.then((accessToken) => {
        //     return this.instance({
        //       ...error.response?.config,
        //       headers: {
        //         ...error.response?.config.headers,
        //         Authorization: `${accessToken}`,
        //       },
        //     });
        //   });
        // }

        return Promise.reject(error);
      },
    );
  }
  private handleRefreshToken() {
    return this.instance
      .post<AuthResponse>(END_POINTS.URL_REFRESH_TOKEN, {
        token: this.refreshToken,
      })
      .then((res) => {
        const response = res.data.metadata
        setAuthToLS("accessToken", response.tokens.accessToken);
        setAuthToLS("refreshToken", response.tokens.refreshToken);
        setAuthToLS('clientId', response.user._id)
        this.accessToken = response.tokens.accessToken;
        this.refreshToken = response.tokens.refreshToken;
        return this.accessToken;
      })
      .catch((err) => {
        this.accessToken = "";
        this.refreshToken = "";
        removeAuthFromLS();
        throw err;
      });
  }
}

const http = new Http().instance;
export default http;