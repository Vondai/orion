using System.ComponentModel.DataAnnotations;

namespace OrionApi.Models.User
{
    public class RegisterModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
