import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { AxiosError, HttpStatusCode, isAxiosError } from "axios";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function isAxiosBadRequestError<BadRequestError>(
  error: unknown,
): error is AxiosError<BadRequestError> {
  return (
    isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
  );
}

export function isAxiosUnauthoriedError<UnauthoriedError>(
  error: unknown,
): error is AxiosError<UnauthoriedError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.Unauthorized
  );
}

export function isAxiosExpiredTokenError<ExpireTokenError>(
  error: unknown,
): error is AxiosError<ExpireTokenError> {
  return (
    isAxiosBadRequestError<ErrorEvent>(error) &&
    error.response?.data.error.message === "Token expired"
  );
}

export function checkPaymentMethodReturnLogo(type: string) {
  switch (type) {
    case "visa":
      return "/images/visa.svg";
    case "Paypal":
      return "/images/paypal.svg";
    case "mastercard":
      return "/images/mastercard.svg";
    case "jcb":
      return "/images/jcb.svg";
    case "union_pay":
      return "/images/union-pay.svg";
  }
  return "/images/default.svg";
}

// export function convertSummaryToJson(dataString?: string) {
//   if (!dataString) return;
//   const splitDataString = dataString
//     .split("Answer:\n")[1]
//     .split("\nEnd of answer.")[0];
//   const parsedData = JSON.parse(splitDataString);
//   return parsedData as SummaryJsonType;
// }

// export function convertSummaryToString(data: SummaryJsonType) {
//   const text = `Summary: ${data.Summary}\n\nKeypoints:\n${data.Keypoints.map((point) => `- ${point}`).join("\n")}\n`;
//   return text;
// }
