using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using OrionApi.Data;
using OrionApi.Data.Models;
using OrionApi.Models.Post;

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

        public ICollection<PostListingModel> GetAll()
            => data.Posts
                .OrderByDescending(p => p.CreatedOn)
                .Select(x => new PostListingModel
                {
                    Id = x.Id,
                    AuthorName = x.Author.UserName,
                    Title = x.Title,
                    CreatedOn = x.CreatedOn.ToString("dd-MMM-yyy", new CultureInfo("en-US")),
                    CommentsCount = x.Comments.Count,
                    CommunityName = x.Community.Name
                })
                .Take(6)
                .ToList();

        public ICollection<PostListingModel> GetByCommunity(string communityName)
            => data.Posts
                .Where(p => p.Community.Name == communityName)
                .OrderByDescending(p => p.CreatedOn)
                .ThenBy(p => p.Title)
                .Select(x => new PostListingModel
                {
                    Id = x.Id,
                    Title = x.Title,
                    CommentsCount = x.Comments.Count,
                    CreatedOn = x.CreatedOn.ToString("dd-MMM-yyy", new CultureInfo("en-US")),
                    AuthorName = x.Author.UserName,
                })
                .Take(6)
                .ToList();
    }
}
