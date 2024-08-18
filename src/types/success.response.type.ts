export default interface SuccessResponse<T,> {
    message:string;
    status:number;
    metadata:T;
}