import { useMemo, useState } from 'react';
import { Boxes, Check, ChevronRight, Filter, PackageCheck, Search, ShoppingBag, X } from 'lucide-react';
import { products, type Product } from './data';

export function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<Product[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const filtered = useMemo(() => products.filter((p) => {
    const matchesCategory = category === 'All' || p.category === category;
    const text = `${p.name} ${p.code} ${p.color}`.toLowerCase();
    return matchesCategory && text.includes(query.toLowerCase());
  }), [query, category]);
  const toggle = (product: Product) => setSelected((current) =>
    current.some((p) => p.id === product.id) ? current.filter((p) => p.id !== product.id) : [...current, product]
  );

  return <div className="app-shell">
    <header>
      <a className="brand" href="#"><span>W/</span> WHOLESALE</a>
      <nav><a href="#catalog">Catalog</a><a href="#collections">Collections</a><a href="#about">About</a></nav>
      <button className="selection-button" onClick={() => setPanelOpen(true)}><ShoppingBag size={18}/> Selection <b>{selected.length}</b></button>
    </header>

    <main>
      <section className="intro">
        <div><p className="eyebrow">AUTUMN / WINTER 2026</p><h1>Wholesale,<br/><em>reframed.</em></h1></div>
        <div className="intro-copy"><p>A focused digital catalog for buyers who need clear product data, live stock signals and a faster way to build orders.</p><a href="#catalog">Explore collection <ChevronRight size={18}/></a></div>
      </section>

      <section className="stats">
        <div><strong>06</strong><span>Active styles</span></div><div><strong>288</strong><span>Units available</span></div><div><strong>03</strong><span>Collections</span></div><div><strong>48h</strong><span>Order response</span></div>
      </section>

      <section id="catalog" className="catalog">
        <div className="section-head"><div><p className="eyebrow">LIVE CATALOG</p><h2>Current collection</h2></div><p>{filtered.length} styles available</p></div>
        <div className="toolbar">
          <label><Search size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search model, code or color"/></label>
          <div className="categories"><Filter size={17}/>{categories.map((item) => <button className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
        </div>
        <div className="grid">{filtered.map((product, index) => <ProductCard key={product.id} product={product} index={index} chosen={selected.some((p) => p.id === product.id)} onToggle={() => toggle(product)}/>)}</div>
      </section>
    </main>

    {panelOpen && <div className="overlay" onClick={() => setPanelOpen(false)}><aside onClick={(e) => e.stopPropagation()}>
      <div className="panel-head"><div><p className="eyebrow">BUYER SELECTION</p><h2>{selected.length} selected styles</h2></div><button onClick={() => setPanelOpen(false)}><X/></button></div>
      {selected.length === 0 ? <div className="empty"><Boxes size={38}/><h3>Your selection is empty</h3><p>Add products from the catalog to prepare a wholesale inquiry.</p></div> : <>
        <div className="selected-list">{selected.map((p) => <div key={p.id}><span>{p.code}</span><strong>{p.name}</strong><button onClick={() => toggle(p)}><X size={16}/></button></div>)}</div>
        <div className="summary"><span>Estimated wholesale value</span><strong>${selected.reduce((sum,p)=>sum+p.price*6,0).toLocaleString()}</strong><small>Calculated as one 6-piece series per style.</small></div>
        <button className="inquiry"><PackageCheck size={19}/> Prepare order inquiry</button>
      </>}
    </aside></div>}
  </div>
}

function ProductCard({ product, index, chosen, onToggle }: { product: Product; index: number; chosen: boolean; onToggle: () => void }) {
  return <article className="product-card">
    <div className={`product-visual visual-${index % 4}`}><span>{product.collection}</span><b>{String(index + 1).padStart(2,'0')}</b></div>
    <div className="product-meta"><div><span>{product.code}</span><h3>{product.name}</h3><p>{product.color}</p></div><strong>${product.price}</strong></div>
    <div className="sizes">{product.sizes.map((size) => <span key={size}>{size}</span>)}<small>{product.stock} units</small></div>
    <button className={chosen ? 'chosen' : ''} onClick={onToggle}>{chosen ? <><Check size={17}/> Added to selection</> : <>Add to selection <ChevronRight size={17}/></>}</button>
  </article>
}
