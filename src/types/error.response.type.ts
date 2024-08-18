export default interface ErrorResponse<T,> {
    message:string;
    status:number;
    metadata:T ;
}