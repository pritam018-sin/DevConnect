import React from 'react';

const Home = () => {
  return (
    <>
      {/* Sleek Code Editor Input Area */}
      <section className="glass-card rounded-xl overflow-hidden border-primary/30 neon-border-purple">
        <div className="bg-primary/10 px-4 py-2 border-b border-primary/20 flex items-center justify-between">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">new_post.tsx</span>
        </div>
        <div className="p-6">
          <div className="flex gap-4">
            <div className="flex flex-col text-slate-600 text-sm select-none font-mono pr-4 border-r border-slate-800">
              <span>1</span><span>2</span><span>3</span>
            </div>
            <textarea className="w-full bg-transparent border-none focus:ring-0 text-slate-200 font-mono placeholder:text-slate-600 resize-none h-24" placeholder="// Share your latest breakthrough..."></textarea>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-glass text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">code</span>
              </button>
              <button className="p-2 rounded-lg bg-glass text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">image</span>
              </button>
              <button className="p-2 rounded-lg bg-glass text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">alternate_email</span>
              </button>
            </div>
            <button className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 transition-all">
              <span>Commit Post</span>
              <span className="material-symbols-outlined text-sm">terminal</span>
            </button>
          </div>
        </div>
      </section>

      {/* Feed Filter Chips */}
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        <button className="px-5 py-2 rounded-full bg-primary/20 text-primary border border-primary/40 font-medium text-sm whitespace-nowrap">All Streams</button>
        <button className="px-5 py-2 rounded-full bg-glass text-slate-400 border border-transparent hover:border-slate-700 font-medium text-sm whitespace-nowrap transition-all">TypeScript</button>
        <button className="px-5 py-2 rounded-full bg-glass text-slate-400 border border-transparent hover:border-slate-700 font-medium text-sm whitespace-nowrap transition-all">React</button>
        <button className="px-5 py-2 rounded-full bg-glass text-slate-400 border border-transparent hover:border-slate-700 font-medium text-sm whitespace-nowrap transition-all">Rust</button>
        <button className="px-5 py-2 rounded-full bg-glass text-slate-400 border border-transparent hover:border-slate-700 font-medium text-sm whitespace-nowrap transition-all">Web3</button>
      </div>

      {/* Posts */}
      <div className="flex flex-col gap-6">
        {/* Post 1 */}
        <article className="glass-card rounded-xl p-6 flex flex-col gap-4 border-slate-800/50 hover:border-primary/40 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-800 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5Xqe69MhjBT5N7VWl99G2HYYZc6eluq1nBOIMItAYcieEBKvqu412qOqPR7WI8vQRsH0gvlOJTAt_ZYDGXeOGfBX2NxEUl2Ol_YqHZngigeuE_YQAIEWpz4x1FEpBsz2n9NfOoq5rYpT7_PDJ9XZL3Gk_E7j_JGKcNXAKWRCJXb0L7vwwmcZGrQmOmLoTSgBmGAg4GUU6AzS2JjQ-5OCybimoZnP5XENUliF0vFDfrMw5d5oVMpBBXUIIDU4pLrddtKVqpFcGVQ')" }}></div>
              <div>
                <h3 className="font-bold text-slate-100">Sarah J. <span className="text-xs font-normal text-slate-500 ml-2">• 2h ago</span></h3>
                <p className="text-sm text-secondary neon-text-teal font-medium">Full-stack Wizard</p>
              </div>
            </div>
            <button className="text-slate-500 hover:text-white transition-colors">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Finally optimized the WebGL fragment shaders for the new dashboard. Reduced rendering time by 40% using this simplified noise function. Check it out! 🚀
          </p>
          <div className="bg-black/40 rounded-xl p-4 font-mono text-sm border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
            <div className="text-secondary opacity-50 mb-2">// noise.glsl</div>
            <div className="text-slate-400">
              <span className="text-primary">float</span> <span className="text-secondary">hash</span>(float n) {'{'} <span className="text-slate-200">return</span> <span className="text-secondary">fract</span>(sin(n) * 43758.5453); {'}'}<br />
              <span className="text-primary">float</span> <span className="text-secondary">noise</span>(vec3 x) {'{'} ... {'}'}
            </div>
          </div>
          <div className="flex items-center gap-6 mt-2">
            <button className="flex items-center gap-2 group text-slate-400 hover:text-secondary transition-all">
              <span className="material-symbols-outlined text-[22px] group-hover:scale-110">favorite</span>
              <span className="text-sm font-bold">1.4k</span>
            </button>
            <button className="flex items-center gap-2 group text-slate-400 hover:text-primary transition-all">
              <span className="material-symbols-outlined text-[22px] group-hover:scale-110">chat_bubble</span>
              <span className="text-sm font-bold">28</span>
            </button>
            <button className="flex items-center gap-2 group text-slate-400 hover:text-white transition-all">
              <span className="material-symbols-outlined text-[22px] group-hover:scale-110">share</span>
              <span className="text-sm font-bold">12</span>
            </button>
          </div>
        </article>

        {/* Post 2 */}
        <article className="glass-card rounded-xl p-6 flex flex-col gap-4 border-slate-800/50 hover:border-primary/40 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-800 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBrHrh15dTRiGWqG4mYuCw-jklERXIyvgXy3c8TGUeMsIlbIR4MLqISlhej_-9iPyn_pXNsYYnW-4fiEtdFqcgIM9VadSI97KCQQBjX3ib-e5kQOlQhx5K4r2NzkgTWze2HTZGaTNJztzjvo4l7TeBbXgpNtNTbNN8eqEAb_5WSfhnhjVzT9bgTeuInNwBCgZwDgIHKobqyFzvFPUpjfCGppQ8ab5v0Ze1UVt_m7L4LvNQqgBmh8LGueWZD2D6OBDzk1Hjj2QqX_A')" }}></div>
              <div>
                <h3 className="font-bold text-slate-100">Marcus T. <span className="text-xs font-normal text-slate-500 ml-2">• 5h ago</span></h3>
                <p className="text-sm text-primary font-medium">Rustacean</p>
              </div>
            </div>
            <button className="text-slate-500 hover:text-white transition-colors">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Just published 'Hermes', a lightweight message broker written in Rust. Zero dependencies, blazingly fast. Looking for contributors! 🦀
          </p>
          <div className="aspect-video w-full rounded-xl bg-slate-800 bg-cover bg-center border border-slate-700 overflow-hidden relative" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAi2nMRpiFdCLftuxJ3y-7J_sgktgN-rgfeeowZpbCfxa1697RU1pMbSGVFz4OtK9K2n--1_YK_fnx-a4KInKI_UbPhu5vnBVRK4IPUQK-oyFhO8N7A4MtXz6ZUNZ5uXLyaBOzTAau0dZSc0P0RxhlfhGPgSU1_jju7lbdJqt51fdkH4CFCAhTy_fD-yNw36JXwkh5NZv0VHroMgGEfhOQ8emI_RINLAAu_aZJNnp4pO3SUkt9JaTu4pzc_oP1W0GVlQoZ3tEKPOA')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <span className="bg-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Project Preview</span>
            </div>
          </div>
          <div className="flex items-center gap-6 mt-2">
            <button className="flex items-center gap-2 group text-slate-400 hover:text-secondary transition-all">
              <span className="material-symbols-outlined text-[22px] group-hover:scale-110">favorite</span>
              <span className="text-sm font-bold">892</span>
            </button>
            <button className="flex items-center gap-2 group text-slate-400 hover:text-primary transition-all">
              <span className="material-symbols-outlined text-[22px] group-hover:scale-110">chat_bubble</span>
              <span className="text-sm font-bold">45</span>
            </button>
            <button className="flex items-center gap-2 group text-slate-400 hover:text-white transition-all">
              <span className="material-symbols-outlined text-[22px] group-hover:scale-110">bookmark</span>
              <span className="text-sm font-bold">103</span>
            </button>
          </div>
        </article>
      </div>
    </>
  );
};

export default Home;