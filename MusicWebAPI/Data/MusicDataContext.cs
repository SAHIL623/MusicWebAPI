using Microsoft.EntityFrameworkCore;
using MusicWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicWebAPI.Data
{
    public class MusicDataContext : DbContext
    {
        public MusicDataContext(DbContextOptions<MusicDataContext> options) : base(options)
        {

        }

        public DbSet<Song> Songs { get; set; }
    }
}
