namespace OneInc.TestApi.Hub
{
    public interface IMessageHubClient
    {
        Task SendResultToUser(string message);
    }
}
