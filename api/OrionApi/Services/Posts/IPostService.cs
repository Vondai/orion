using System.Threading.Tasks;

namespace OrionApi.Services.Posts
{
    public interface IPostService
    {
        public Task<string> Create(string title, string content, string communityId, string userId);
    }
}
