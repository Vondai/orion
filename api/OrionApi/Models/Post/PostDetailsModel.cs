using OrionApi.Models.Comment;
using OrionApi.Models.User;
using System.Collections.Generic;

namespace OrionApi.Models.Post
{
    public class PostModel
    {
        public PostModel()
        {
            this.Comments = new List<CommentModel>();
        }
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public AuthorModel Author { get; set; }

        public string CreatedOn { get; set; }

        public int CommentsCount { get; set; }

        public ICollection<CommentModel> Comments { get; set; }
    }
}
