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
    [Route("api/Categorias")]
    public class CategoriasController : Controller
    {
        private readonly EstabelecimentoContext _context;

        public CategoriasController(EstabelecimentoContext context)
        {
            _context = context;
        }

        // GET: api/Categorias
        [HttpGet]
        public IEnumerable<Categoria> GetCategorias()
        {
            return _context.Categorias;
        }

        // GET: api/Categorias/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoria([FromRoute] int id)
        {
            var categoria = await _context.Categorias.SingleOrDefaultAsync(m => m.seq == id);

            if (categoria == null)
                return NotFound();

            return Ok(categoria);
        }

        // PUT: api/Categorias/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoria([FromBody] Categoria categoria)
        {
            _context.Entry(categoria).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoriaExists(categoria.seq))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // POST: api/Categorias
        [HttpPost]
        public async Task<IActionResult> PostCategoria([FromBody] Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCategoria", new { id = categoria.seq }, categoria);
        }

        // DELETE: api/Categorias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoria([FromBody] Categoria categoria, [FromRoute] int id)
        {
            var categoriaVar = await _context.Categorias.SingleOrDefaultAsync(m => m.seq == id);
            if (categoriaVar == null)
                return NotFound();

            _context.Categorias.Remove(categoriaVar);
            await _context.SaveChangesAsync();

            return Ok(categoriaVar);
        }

        private bool CategoriaExists(int id)
        {
            return _context.Estabelecimentos.Any(e => e.seq == id);
        }
    }
}
