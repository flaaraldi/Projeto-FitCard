using PrjFitCard.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PrjFitCard.Controllers
{
    [Produces("application/json")]
    [Route("api/Status")]
    public class StatusController : Controller
    {
        private readonly EstabelecimentoContext _context;

        public StatusController(EstabelecimentoContext context)
        {
            _context = context;
        }

        // GET: api/Status
        [HttpGet]
        //[EnableCors("SiteCorsPolicy")]
        public IEnumerable<Status> GetStatus()
        {
            return _context.Status;
        }

        // GET: api/Estabelecimentos/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStatus([FromRoute] int id)
        {
            var status = await _context.Status.SingleOrDefaultAsync(m => m.seq == id);

            if (status == null)
            {
                return NotFound();
            }

            return Ok(status);
        }

        // PUT: api/Estabelecimentos/5
        [HttpPut("{id}")]
        //[EnableCors("SiteCorsPolicy")]
        public async Task<IActionResult> PutStatus([FromRoute] int id, [FromBody] Estabelecimento status)
        {
            if (id != status.seq)
            {
                return BadRequest();
            }

            _context.Entry(status).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatusExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Estabelecimentos
        [HttpPost]
        //[EnableCors("SiteCorsPolicy")]
        public async Task<IActionResult> PostStatus([FromBody] Status status)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            _context.Status.Add(status);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStatus", new { id = status.seq }, status);
        }

        // DELETE: api/Estabelecimentos/5
        [HttpDelete("{id}")]
        //[EnableCors("SiteCorsPolicy")]
        public async Task<IActionResult> DeleteStatus([FromRoute] int id)
        {
            var status = await _context.Status.SingleOrDefaultAsync(m => m.seq == id);
            if (status == null)
            {
                return NotFound();
            }

            _context.Status.Remove(status);
            await _context.SaveChangesAsync();

            return Ok(status);
        }

        private bool StatusExists(int id)
        {
            return _context.Status.Any(e => e.seq == id);
        }
    }
}
