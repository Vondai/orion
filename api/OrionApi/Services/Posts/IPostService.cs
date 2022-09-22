using System.Collections.Generic;
using System.Threading.Tasks;
using OrionApi.Models.Post;

namespace OrionApi.Services.Posts
{
    public interface IPostService
    {
        public Task<string> Create(string title, string content, string communityId, string userId);

        public ICollection<PostListingModel> GetAll();

        public ICollection<PostListingModel> GetByCommunity(string communityName);

        public PostModel GetById(string postId);

        public bool IsValidById(string postId);

        public string GetCommunityId(string postId);
    }
}
