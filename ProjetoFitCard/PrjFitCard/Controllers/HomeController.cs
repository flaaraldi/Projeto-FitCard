using PrjFitCard.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace PrjFitCard.Controllers
{
    public class HomeController : Controller
    {
        private readonly EstabelecimentoContext _context;

        public HomeController(EstabelecimentoContext context)
        {
            _context = context;    
        }

        // GET: Home
        public async Task<IActionResult> Index()
        {
            return View(await _context.Estabelecimentos.ToListAsync());
        }

        // GET: Home/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
                return NotFound();

            var estabelecimento = await _context.Estabelecimentos
                .SingleOrDefaultAsync(m => m.seq == id);
            if (estabelecimento == null)
                return NotFound();

            return View(estabelecimento);
        }

        // GET: Home/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Home/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public async Task<IActionResult> Create([Bind("seq, razao_social, nome_fantasia, cnpj, email, endereco, cidade, estado, telefone, categoria, status, conta, agencia")] Estabelecimento estabelecimento)
        {
            if (ModelState.IsValid)
            {
                _context.Add(estabelecimento);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(estabelecimento);
        }

        // GET: Home/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
                return NotFound();

            var estabelecimento = await _context.Estabelecimentos.SingleOrDefaultAsync(m => m.seq == id);
            if (estabelecimento == null)
                return NotFound();
            return View(estabelecimento);
        }

        // POST: Home/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public async Task<IActionResult> Edit(int id, [Bind("seq, razao_social, nome_fantasia, cnpj, email, endereco, cidade, estado, telefone, categoria, status, conta, agencia")] Estabelecimento estabelecimento)
        {
            if (id != estabelecimento.seq)
                return NotFound();

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(estabelecimento);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FuncionarioExists(estabelecimento.seq))
                        return NotFound();
                    else
                        throw;
                }
                return RedirectToAction("Index");
            }
            return View(estabelecimento);
        }

        // GET: Home/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
                return NotFound();

            var estabelecimento = await _context.Estabelecimentos
                .SingleOrDefaultAsync(m => m.seq == id);
            if (estabelecimento == null)
                return NotFound();

            return View(estabelecimento);
        }

        // POST: Home/Delete/5
        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var estabelecimento = await _context.Estabelecimentos.SingleOrDefaultAsync(m => m.seq == id);
            _context.Estabelecimentos.Remove(estabelecimento);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        private bool FuncionarioExists(int id)
        {
            return _context.Estabelecimentos.Any(e => e.seq == id);
        }
    }
}
