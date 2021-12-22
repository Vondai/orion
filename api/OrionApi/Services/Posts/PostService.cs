using System;
using System.Threading.Tasks;
using OrionApi.Data;
using OrionApi.Data.Models;

namespace OrionApi.Services.Posts
{
    public class PostService : IPostService
    {
        private readonly OrionDbContext data;

        public PostService(OrionDbContext data)
        {
            this.data = data;
        }

        public async Task<string> Create(string title, string content, string communityId, string userId)
        {
            var post = new Post
            {
                AuthorId = userId,
                Title = title,
                Description = content,
                CreatedOn = DateTime.UtcNow,
                CommunityId = communityId,
            };

            await data.Posts.AddAsync(post);
            await data.SaveChangesAsync();

            return post.Id;
        }
    }
}
