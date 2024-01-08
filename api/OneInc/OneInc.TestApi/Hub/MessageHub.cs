using Microsoft.AspNetCore.SignalR;

namespace OneInc.TestApi.Hub
{
    public class MessageHub : Hub<IMessageHubClient>
    {
        public async Task SendResultToUser(string message)
        {
            await Clients.All.SendResultToUser(message);
        }
    }
}
