using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrionApi.Data;
using OrionApi.Data.Models;
using OrionApi.Models.Comment;
using OrionApi.Models.Post;
using OrionApi.Models.User;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

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

        public PostModel GetById(string postId, string sort)
        {
            var post = data.Posts
            .Where(p => p.Id == postId)
            .Select(x => new PostModel
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                Author = new AuthorModel
                {
                    Username = x.Author.UserName,
                    TotalPosts = x.Author.Posts.Count
                },
                CommentsCount = x.Comments.Count,
                CreatedOn = x.CreatedOn.ToString("dd-MMM-yyy", new CultureInfo("en-US")),
                Comments = x.Comments
                .Select(c => new CommentModel
                {
                    Id = c.Id,
                    Author = c.Author.UserName,
                    Content = c.Content,
                    CreatedOn = c.CreatedOn.ToString("dd-MMM-yyy", new CultureInfo("en-US"))
                }).ToList()
            })
            .FirstOrDefault();
            switch (sort)
            {
                case "new":
                    post.Comments = post.Comments.OrderByDescending(p => p.CreatedOn).ToList();
                    break;
                case "old":
                    post.Comments= post.Comments.OrderBy(p => p.CreatedOn).ToList();
                    break;
                default:
                    post.Comments = post.Comments.OrderBy(p => p.CreatedOn).ToList();
                    break;
            }

            return post;
        }

        public string GetCommunityId(string postId)
            => data.Posts.Where(p => p.Id == postId)
                .Select(x => x.Community.Id)
                .FirstOrDefault();

        public bool IsValidById(string postId)
            => data.Posts.Any(p => p.Id == postId);
    }
}
