using System.Collections.Generic;
using System.Threading.Tasks;
using OrionApi.Models.Post;

namespace OrionApi.Services.Posts
{
    public interface IPostService
    {
        public Task<string> Create(string title, string content, string communityId, string userId);

        public ICollection<PostListingModel> GetAll();
    }
}
