using System;
using System.ComponentModel.DataAnnotations;

namespace OrionApi.Data.Models
{
    public class Comment
    {
        public Comment()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string Id { get; set; }

        public string Content { get; set; }

        public DateTime CreatedOn { get; set; }

        [Required]
        public string PostId { get; set; }

        public Post Post { get; set; }

        [Required]
        public string AuthorId { get; set; }

        public User Author { get; set; }


    }
}
