namespace OrionApi.Models
{
    public class ResponseMessage
    {
        public ResponseMessage(string message)
        {
            this.Message = message;
        }
        public string Message { get; set; }
    }
}
