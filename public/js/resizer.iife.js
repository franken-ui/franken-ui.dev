var FRANKENUIRESIZER=function(c,a,n){"use strict";function d(s){if(s.startsWith("{"))try{return JSON.parse(s)}catch{return console.error("Error parsing",s),{}}if(s.includes(":"))try{const t={};return s.replace(/[;\s]+$/,"").split(";").forEach(i=>{const e=i.trim().split(/:(.*)/);t[e[0].trim()]=e[1].trim()}),t}catch{return console.error("Error parsing",s),{}}return s}var f=Object.defineProperty,p=(s,t,i,e)=>{for(var r=void 0,l=s.length-1,h;l>=0;l--)(h=s[l])&&(r=h(t,i,r)||r);return r&&f(t,i,r),r};class o extends a.LitElement{constructor(){super(...arguments),this["cls-custom"]="",this.i18n="",this["force-prevent-rerender"]=!1,this.$i18n={},this.$cls={},this.isRendered=!1}get $locales(){const t={};return Object.keys(this.$i18n).forEach(i=>{t[i]=this.$i18n[i].includes(",")?this.$i18n[i].split(",").map(e=>e.trim()):this.$i18n[i]}),t}initializeCls(){if(this["cls-custom"]){const t=d(this["cls-custom"]);typeof t=="string"?this.$cls[this["cls-default-element"]]=t:Object.keys(this.$cls).forEach(i=>{const e=i;t[e]&&(this.$cls[e]=t[e])})}}initializeI18n(){if(this.i18n){const t=d(this.i18n);typeof t=="object"&&(this.$i18n=Object.assign(this.$i18n,t))}}connectedCallback(){var t;super.connectedCallback(),this.initializeCls(),this.initializeI18n(),this["force-prevent-rerender"]&&this.renderRoot.querySelector("[data-host-inner]")&&((t=this.renderRoot.querySelector("[data-host-inner]"))==null||t.remove())}createRenderRoot(){return this}}p([n.property({type:String})],o.prototype,"cls-custom"),p([n.property({type:String})],o.prototype,"i18n"),p([n.property({type:Boolean})],o.prototype,"force-prevent-rerender"),p([n.state()],o.prototype,"$i18n"),p([n.state()],o.prototype,"$cls");var b=Object.defineProperty,$=Object.getOwnPropertyDescriptor,u=(s,t,i,e)=>{for(var r=e>1?void 0:e?$(t,i):t,l=s.length-1,h;l>=0;l--)(h=s[l])&&(r=(e?h(t,i,r):h(r))||r);return e&&r&&b(t,i,r),r};return c.Resizer=class extends o{constructor(){super(...arguments),this["cls-default-element"]="button",this.selector="",this.customizable=!1,this.$cls={input:"",button:""},this.viewports={xs:320,sm:640,md:768,lg:1024,xl:1280}}getViewportSize(t){for(const[i,e]of Object.entries(this.viewports))if(t===e)return i;return"custom"}connectedCallback(){super.connectedCallback(),this.hasAttribute("width")&&this.width&&(this.size=this.getViewportSize(this.width),this.resize())}createRenderRoot(){return this}preselect(t){this.size=t,this.width=this.viewports[t],this.resize()}resize(){const t=document.querySelector(this.selector);t&&(t.style.maxWidth=`${this.width}px`,t.style.margin="0 auto")}render(){return a.html`
      <div data-host-inner class="uk-resizer">
        <div class="uk-btn-group">
          <button
            @click=${()=>this.preselect("xl")}
            class="${this.size==="xl"?"uk-active":""} ${this.$cls.button} uk-btn uk-btn-default"
          >
            XL
          </button>
          <button
            @click=${()=>this.preselect("lg")}
            class="${this.size==="lg"?"uk-active":""} ${this.$cls.button} uk-btn uk-btn-default"
          >
            LG
          </button>
          <button
            @click=${()=>this.preselect("md")}
            class="${this.size==="md"?"uk-active":""} ${this.$cls.button} uk-btn uk-btn-default"
          >
            MD
          </button>
          <button
            @click=${()=>this.preselect("sm")}
            class="${this.size==="sm"?"uk-active":""} ${this.$cls.button} uk-btn uk-btn-default"
          >
            SM
          </button>
          <button
            @click=${()=>this.preselect("xs")}
            class="${this.size==="xs"?"uk-active":""} ${this.$cls.button} uk-btn uk-btn-default"
          >
            XS
          </button>
        </div>

        ${this.customizable?a.html`
              <div class="uk-resizer-custom uk-inline">
                <span class="uk-form-icon uk-form-icon-flip">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-scaling-icon lucide-scaling"
                  >
                    <path
                      d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    />
                    <path d="M14 15H9v-5" />
                    <path d="M16 3h5v5" />
                    <path d="M21 3 9 15" />
                  </svg>
                </span>
                <input
                  type="number"
                  class="${this.$cls.input} uk-form-small uk-input"
                  min="1"
                  value=${this.width}
                  @input=${t=>{const i=t.target,e=parseInt(i.value,10);isNaN(e)||(this.width=e,this.size=this.getViewportSize(e),this.resize())}}
                />
              </div>
            `:""}
      </div>
    `}},u([n.property({type:String})],c.Resizer.prototype,"selector",2),u([n.property({type:String})],c.Resizer.prototype,"size",2),u([n.property({type:Number})],c.Resizer.prototype,"width",2),u([n.property({type:Boolean})],c.Resizer.prototype,"customizable",2),u([n.state()],c.Resizer.prototype,"$cls",2),c.Resizer=u([n.customElement("uk-resizer")],c.Resizer),Object.defineProperty(c,Symbol.toStringTag,{value:"Module"}),c}({},Lit,LitDecorators);
