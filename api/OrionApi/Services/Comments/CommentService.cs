using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using OrionApi.Data;
using OrionApi.Data.Models;
using OrionApi.Models.Comment;

namespace OrionApi.Services.Comments
{
    public class CommentService : ICommentService
    {
        private readonly OrionDbContext data;

        public CommentService(OrionDbContext data) => this.data = data;

        public async Task<CommentModel> Create(string content, string postId, string communityId, string userId)
        {
            var comment = new Comment
            {
                Content = content,
                PostId = postId,
                AuthorId = userId,
                CreatedOn = DateTime.UtcNow,
            };

            data.Comments.Add(comment);
            await data.SaveChangesAsync();

            var commentModel = GetById(comment.Id);

            return commentModel;
        }

        public ICollection<CommentModel> Get(string postId)
            => data.Comments
            .Where(c => c.PostId == postId)
            .OrderByDescending(c => c.CreatedOn)
            .Select(x => new CommentModel
            {
                Id = x.Id,
                Author = x.Author.UserName,
                CreatedOn = x.CreatedOn.ToString("dd-MMM-yyy", new CultureInfo("en-US")),
                Content = x.Content,
            })
            .ToList();

        public CommentModel GetById(string commentId)
            => data.Comments.Where(c => c.Id == commentId)
            .Select(x => new CommentModel
            {
                Id = x.Id,
                Author = x.Author.UserName,
                Content = x.Content,
                CreatedOn = x.CreatedOn.ToString("dd-MMM-yyy", new CultureInfo("en-US")),
            })
            .FirstOrDefault();
    }
}
