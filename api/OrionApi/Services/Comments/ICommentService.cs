using OrionApi.Models.Comment;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrionApi.Services.Comments
{
    public interface ICommentService
    {
        public Task<string> Create(string content, string postId, string communityId, string userId);

        public ICollection<CommentModel> Get(string postId);

        public CommentModel GetById(string commentId);
    }
}
