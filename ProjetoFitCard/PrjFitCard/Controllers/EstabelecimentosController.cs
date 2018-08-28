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
    [Route("api/Estabelecimentos")]
    public class EstabelecimentosController : Controller
    {
        private readonly EstabelecimentoContext _context;

        public EstabelecimentosController(EstabelecimentoContext context)
        {
            _context = context;
        }

        // GET: api/Estabelecimentos
        [HttpGet]
        public IEnumerable<Estabelecimento> GetEstabelecimentos()
        {
            return _context.Estabelecimentos;
        }

        // GET: api/Estabelecimentos/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEstabelecimento([FromRoute] int id)
        {
            var estabelecimento = await _context.Estabelecimentos.SingleOrDefaultAsync(m => m.seq == id);

            if (estabelecimento == null)
                return NotFound();

            return Ok(estabelecimento);
        }

        // PUT: api/Estabelecimentos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstabelecimento([FromBody] Estabelecimento estabelecimento)
        {
            _context.Entry(estabelecimento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstabelecimentoExists(estabelecimento.seq))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // POST: api/Estabelecimentos
        [HttpPost]
        public async Task<IActionResult> PostEstabelecimento([FromBody] Estabelecimento estabelecimento)
        {
            _context.Estabelecimentos.Add(estabelecimento);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetEstabelecimento", new { id = estabelecimento.seq }, estabelecimento);
        }

        // DELETE: api/Estabelecimentos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstabelecimento([FromBody] Estabelecimento estabelecimento, [FromRoute] int id)
        {
            var estabelecimentoVar = await _context.Estabelecimentos.SingleOrDefaultAsync(m => m.seq == id);
            if (estabelecimentoVar == null)
                return NotFound();

            _context.Estabelecimentos.Remove(estabelecimentoVar);
            await _context.SaveChangesAsync();

            return Ok(estabelecimentoVar);
        }

        private bool EstabelecimentoExists(int id)
        {
            return _context.Estabelecimentos.Any(e => e.seq == id);
        }
    }
}