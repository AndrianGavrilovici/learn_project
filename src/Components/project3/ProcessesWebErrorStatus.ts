const ProcessesWebErrorStatus = (statusText: string, status: number): string => {
    switch (status) {
        case 403:
            statusText = "Code 403: Access forbidden";
            break;
        case 404:
            statusText = "Code 404: Endpoint not found";
            break;
        case 500:
            statusText = "Code 500: Internal server error";
            break;
        case 503:
            statusText = "Code 503: Service unavailable";
            break;
        default:
            statusText = "Something went wrong";
            break;
    }
    return statusText;
}

export default ProcessesWebErrorStatus;