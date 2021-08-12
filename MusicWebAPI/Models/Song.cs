using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicWebAPI.Models
{
    public class Song
    {
        public int Id { get; set; }

        public string SongTitle { get; set; }

        public string Artist { get; set; }

        public string Url { get; set; }
    }
}
