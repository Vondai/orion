using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OrionApi.Data.Models
{
    public class Community
    {
        public Community()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Members = new HashSet<User>();
            this.Posts = new HashSet<Post>();
        }

        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public DateTime CreatedOn { get; set; }

        public ICollection<User> Members { get; set; }

        public ICollection<Post> Posts { get; set; }
    }
}
