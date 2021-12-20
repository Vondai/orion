using System.ComponentModel.DataAnnotations;

namespace OrionApi.Models.Communities
{
    public class CommunityCreateModel
    {
        [Required]
        public string Title  { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
