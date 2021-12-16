using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace OrionApi.Services.Users
{
    public interface IUsersService
    {
        public Task<IdentityResult> RegisterUser(string username, string password);

        public Task<string> LoginUser(string username, string password);
    }
}
