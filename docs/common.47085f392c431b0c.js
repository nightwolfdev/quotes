"use strict";(self.webpackChunkquotes=self.webpackChunkquotes||[]).push([[592],{541:(m,l,t)=>{t.d(l,{S:()=>S});var g=t(1135),p=t(515),i=t(4482),v=t(2733),f=t(7359),n=t(4004),d=t(8505),e=t(2340),u=t(1571),A=t(529);let S=(()=>{class o{constructor(r){this.http=r,this._authors=new g.X(null),this.authors$=this._authors.asObservable(),this.getAuthors().subscribe()}getAuthors(){let r=1;return this.http.get(this.getAuthorsUrl(r)).pipe(function c(o,a=1/0,r){return a=(a||0)<1?1/0:a,(0,i.e)((s,h)=>(0,v.p)(s,h,o,a,void 0,!0,r))}(s=>s.page<s.totalPages?(r++,this.http.get(this.getAuthorsUrl(r))):p.E),function E(o,a){return(0,i.e)((0,f.U)(o,a,arguments.length>=2,!1,!0))}((s,h)=>s.concat(h.results),[]),(0,n.U)(s=>s.filter(h=>h.quoteCount>0)),(0,d.b)(s=>this._authors.next(s)))}getAuthorsUrl(r){return`${e.N.apiServer}/authors?limit=150&page=${r}`}getAuthorBySlug(r){return this.authors$.pipe((0,n.U)(s=>s?.find(h=>h.slug===r)))}}return o.\u0275fac=function(r){return new(r||o)(u.LFG(A.eN))},o.\u0275prov=u.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()},3402:(m,l,t)=>{t.d(l,{G:()=>E});var g=t(6099),p=t(4004),i=t(2340),v=t(1571),c=t(541),f=t(529);let E=(()=>{class n{constructor(e,u){this.authorsSvc=e,this.http=u}getQuotes(e,u,A=1){return this.http.get(`${i.N.apiServer}/quotes?limit=50&page=${A+`${e?"&author="+e:""}${u?"&tags="+u:""}`}`)}getRandomQuote(){return this.http.get(`${i.N.apiServer}/random`).pipe((0,g.z)(e=>this.authorsSvc.getAuthorBySlug(e.authorSlug).pipe((0,p.U)(u=>({...e,author:u})))))}}return n.\u0275fac=function(e){return new(e||n)(v.LFG(c.S),v.LFG(f.eN))},n.\u0275prov=v.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()}}]);