using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using OneInc.TestApi.Hub;

namespace OneInc.TestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StringCipherController : ControllerBase
    {
        private IHubContext<MessageHub, IMessageHubClient> messageHub;
        public StringCipherController(IHubContext<MessageHub, IMessageHubClient> _messageHub)
        {
            messageHub = _messageHub;
        }
        [HttpPost]
        [AllowAnonymous]
        [Route("ConvertToBase64")]
        public string ConvertToBase64(string text)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(text);
            string convertedText = System.Convert.ToBase64String(plainTextBytes);
            Random r = new Random();

            foreach (char character in convertedText)
            {

                int number = r.Next(1, 5);

                Thread.Sleep(number * 1000);

                messageHub.Clients.All.SendResultToUser(character.ToString());
            }

            return "String has been sent successfully to all users!";
        }
    }
}
