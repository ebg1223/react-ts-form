import e,{createContext as n,useState as t,useEffect as r,useContext as o,useRef as i,Fragment as a}from"react";import{useController as d,useForm as c,FormProvider as s}from"react-hook-form";import{z as u,ZodFirstPartyTypeKind as f}from"zod";import{zodResolver as l}from"@hookform/resolvers/zod";const p="_rtf_id";function m(e){return p in e._def}function y(e,n){return function(e,n){for(const t in n)e._def[t]=n[t];return e}(e.brand(),{[p]:n})}function h(e,n,t,r){return new(t||(t=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function d(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,d)}c((r=r.apply(e,n||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;const b=new Set([u.ZodFirstPartyTypeKind.ZodOptional,u.ZodFirstPartyTypeKind.ZodNullable,u.ZodFirstPartyTypeKind.ZodBranded,u.ZodFirstPartyTypeKind.ZodDefault]);function _(e){let n=e,t=null;for(;b.has(n._def.typeName);)switch(m(n)&&(t=n._def[p]),n._def.typeName){case u.ZodFirstPartyTypeKind.ZodOptional:n=n._def.innerType;break;case u.ZodFirstPartyTypeKind.ZodBranded:n=n._def.type;break;case u.ZodFirstPartyTypeKind.ZodNullable:case u.ZodFirstPartyTypeKind.ZodDefault:n=n._def.innerType}let r=null;return m(n)&&(r=n._def[p]),{type:n,[p]:r||t}}function v(e){return e._def.typeName===f.ZodEffects?e._def.schema:e}function g(e,n){let{type:t,_rtf_id:r}=_(e),{type:o,_rtf_id:i}=_(n);if(r||i)return r===i;if(t._def.typeName!==o._def.typeName)return!1;if(t._def.typeName===f.ZodArray&&o._def.typeName===f.ZodArray)return!!g(t._def.type,o._def.type);if(t._def.typeName===f.ZodSet&&o._def.typeName===f.ZodSet)return!!g(t._def.valueType,o._def.valueType);if(t._def.typeName===f.ZodMap&&o._def.typeName===f.ZodMap)return!(!g(t._def.keyType,o._def.keyType)||!g(t._def.valueType,o._def.valueType));if(t._def.typeName===f.ZodRecord&&o._def.typeName===f.ZodRecord)return!!g(t._def.valueType,o._def.valueType);if(t._def.typeName===f.ZodTuple&&o._def.typeName===f.ZodTuple){const e=t._def.items,n=o._def.items;if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(!g(e[t],n[t]))return!1;return!0}if(t._def.typeName===f.ZodObject&&o._def.typeName===f.ZodObject){const e=t._def.shape(),n=o._def.shape();if(!e||!n)return!e&&!n;const r=Object.keys(e),i=Object.keys(n),d=new Set(r),c=new Set(i);for(const e of i)if(!d.has(e))return!1;for(const e of r)if(!c.has(e))return!1;for(var a of r){const t=e[a],r=n[a];if(!r||!g(t,r))return!1}}return!0}function T(e,n){return e._def.typeName===f[n]}const Z=" // ";function j(e){if(!e)return;const[n,...t]=e.split(Z).map((e=>e.trim())),r=t.join(Z);return{label:n,placeholder:r||void 0}}function E(e){if(e._def.typeName===u.ZodFirstPartyTypeKind.ZodEnum)return e._def.values}const O=u.object({}),F=u.object({message:u.string(),type:u.string()});function w(e){if(!function(e){return O.safeParse(e).success}(e))return;if(function(e){return F.safeParse(e).success}(e))return{errorMessage:e.message};const n={};for(const t in e)n[t]=w(e[t]);return n}const N=n(null);function S({name:n,control:t,children:r,label:o,placeholder:i,enumValues:a,zodType:d,addToCoerceUndefined:c,removeFromCoerceUndefined:s}){return e.createElement(N.Provider,{value:{control:t,name:n,label:o,placeholder:i,enumValues:a,zodType:d,addToCoerceUndefined:c,removeFromCoerceUndefined:s}},r)}function C(e){const n=o(N);if(!n)throw Error(`${e} must be called from within a FieldContextProvider... if you use this hook, the component must be rendered by @ts-react/form.`);return n}function V(){const e=C("useTsController"),n=d(e),{fieldState:o,field:{onChange:i,value:a}}=n,[c,s]=t(!1);return r((()=>{a&&c&&(s(!1),e.removeFromCoerceUndefined(e.name))}),[a]),Object.assign(Object.assign({},n),{error:w(o.error),field:Object.assign(Object.assign({},n.field),{value:c?void 0:n.field.value,onChange:function(n){void 0===n?(s(!0),e.addToCoerceUndefined(e.name)):(s(!1),e.removeFromCoerceUndefined(e.name),i(n))}})})}function U(e,n){return`No ${e} found when calling ${n}. Either pass it as a prop or pass it using the zod .describe() syntax.`}function D(){const{label:e,placeholder:n}=C("useReqDescription");return{label:e,placeholder:n}}function P(){const{label:e,placeholder:n}=C("useReqDescription");if(!e)throw new Error(U("label","useReqDescription"));if(!n)throw new Error(U("placeholder","useReqDescription"));return{label:e,placeholder:n}}function k(){const{enumValues:e}=C("useEnumValues");if(!e)throw new Error("Enum values not passed. Any component that calls useEnumValues should be rendered from an '.enum()' zod field.");return e}function z(e){const{type:n,_rtf_id:t}=_(e);return{type:n,zodType:e,uniqueId:null!=t?t:void 0,isOptional:e.isOptional(),isNullable:e.isNullable(),defaultValue:function(){const n=e._def;if(t=n,Boolean(t&&"object"==typeof t&&"defaultValue"in t&&"function"==typeof t.defaultValue)){return n.defaultValue()}var t}()}}function $(e){const{zodType:n,label:t,placeholder:r}=C(e),o=z(n);return Object.assign(Object.assign({},o),{label:t,placeholder:r})}function x(){return $("useFieldInfo")}function I(e,n,t){const r=$(t);const o=function(){const{type:n}=r;if("ZodArray"!==e&&T(n,"ZodArray")){return n.element}return n}();if(!T(o,e))throw new Error(function(e,{expectedType:n,receivedType:t}){return`Make sure that the '${e}' hook is being called inside of a custom form component which matches the correct type.\n  The expected type is '${n}' but the received type was '${t}'`}(t,{expectedType:e,receivedType:o._def.typeName}));return Object.assign(Object.assign({},function(e,n){return Object.entries(n).reduce(((n,[t])=>{const r=e[t];return"string"!=typeof r&&"number"!=typeof r&&"boolean"!=typeof r&&"bigint"!=typeof r&&void 0!==r||(n[t]=r),n}),{})}(o,n)),r)}function R(){return I("ZodString",{description:!0,isCUID:!0,isCUID2:!0,isDatetime:!0,isEmail:!0,isEmoji:!0,isIP:!0,isULID:!0,isURL:!0,isUUID:!0,maxLength:!0,minLength:!0},"useStringFieldInfo")}function A(){const e=I("ZodDate",{description:!0,maxDate:!0,minDate:!0},"useDateFieldInfo");return Object.assign(Object.assign({},e),{maxDate:e.type.maxDate,minDate:e.type.minDate})}function K(){return I("ZodNumber",{description:!0,isFinite:!0,isInt:!0,maxValue:!0,minValue:!0},"useNumberFieldInfo")}const M={enum:!1,useEnum:!1,duplicateSchema:!1};function q(){var e;M.duplicateSchema||(M.duplicateSchema=!0,e="Found duplicate zod schema in zod-component mapping. Each zod type in the mapping must be unique, if you need to map multiple of the same types to different schemas use createUniqueFieldSchema.",console.warn(`@ts-react/form: ${e}`))}const L=[["name","name"],["control","control"],["enumValues","enumValues"]];function B(n,t){const o=(null==t?void 0:t.FormComponent)?t.FormComponent:"form",d=n.map((e=>e[0]));!function(e){var n=e.flatMap(((n,t)=>e.slice(t+1).map((e=>[n,e]))));for(const[e,t]of n)g(e,t)&&q()}(d),function(e){let n=new Set;for(const t of e)if(m(t)){if(n.has(t._def[p]))throw new Error(`Duplicate id passed to createFieldSchema: ${t._def[p]}. Ensure that each id is only being used once and that createFieldSchema is only called at the top level.`);n.add(t._def[p])}}(d);const u=function(e){const n={};for(const[t,r]of e)n[t]=r;return n}((null==t?void 0:t.propsMap)?t.propsMap:L);return function({schema:t,onSubmit:d,props:p,formProps:m,defaultValues:y,renderAfter:b,renderBefore:T,form:Z,children:O}){if(!!i(Z).current!=!!Z)throw new Error("useFormResult prop changed - its value shouldn't changed during the lifetime of the component.");const F=l(t),w=(()=>{if(Z)return Z;return c({resolver:F,defaultValues:y})})();r((()=>{Z&&y&&Z.reset(y)}),[]);const{control:N,handleSubmit:C,setError:V,getValues:U}=w,D=function({resolver:e,onSubmit:n,setError:t}){const r=i(new Set);function o(e){r.current.add(e)}function a(e){r.current.delete(e)}function d(e){const n=Object.assign({},e);for(const e of r.current)delete n[e];return n}function c(r){return e(d(r),{},{}).then((e=>h(this,void 0,void 0,(function*(){const r=Object.keys(e.errors);if(r.length)for(const n of r)t(n,e.errors[n]);else yield n(e.values)}))))}return{submit:c,removeUndefined:d,removeFromCoerceUndefined:a,addToCoerceUndefined:o}}({resolver:F,onSubmit:d,setError:V}),P=C(D.submit);function k(t,r,o,i,d){var c,s,f,l,p;const m=v(t),y=function(e,n){for(const t of n)if(g(e,t[0]))return t[1]}(m,n);if(!y){if(G(m)){const e=m._def.shape();return Object.entries(e).reduce(((e,[n,t])=>(e[n]=k(t,r&&r[n]?r[n]:void 0,n,`${i}.${n}`,d&&d[n]),e)),{})}if(H(m))return(null!==(c=d)&&void 0!==c?c:[]).map(((e,n)=>k(m.element,r,o,`${i}[${n}]`,e)));throw new Error((h=o.toString(),`No matching zod schema for type \`${m._def.typeName}\` found in mapping for property \`${h}\`. Make sure there's a matching zod schema for every property in your schema.`))}var h;const b=function(e){const n=_(e),t=function(e){let n=e;if(n._def.description)return n._def.description;for(;"unwrap"in n;)if(n=n.unwrap(),n._def.description)return n._def.description}(e);return{description:j(t),enumValues:E(n.type)}}(m),T=r&&r[o]?r[o]:{},{beforeElement:Z,afterElement:O}=T,F=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},u.name&&{[u.name]:i}),u.control&&{[u.control]:N}),u.enumValues&&{[u.enumValues]:b.enumValues}),u.descriptionLabel&&{[u.descriptionLabel]:null===(s=b.description)||void 0===s?void 0:s.label}),u.descriptionPlaceholder&&{[u.descriptionPlaceholder]:null===(f=b.description)||void 0===f?void 0:f.placeholder}),T),w=null===(l=b.description)||void 0===l?void 0:l.label,C=null===(p=b.description)||void 0===p?void 0:p.placeholder;return e.createElement(a,{key:i},Z,e.createElement(S,{control:N,name:i,label:w,zodType:m,placeholder:C,enumValues:b.enumValues,addToCoerceUndefined:D.addToCoerceUndefined,removeFromCoerceUndefined:D.removeFromCoerceUndefined},e.createElement(y,Object.assign({key:i},F))),O)}const z=function(e,n){const t=v(e)._def.shape();return Object.entries(t).reduce(((e,[t,r])=>{const o=t.toString();return e[o]=k(r,n,o,o,U()[t]),e}),{})}(t,p);return e.createElement(s,Object.assign({},w),e.createElement(o,Object.assign({},m,{onSubmit:P}),T&&T({submit:P}),e.createElement(f,{renderedFields:z,customChildRenderProp:O}),b&&b({submit:P})))};function f({customChildRenderProp:n,renderedFields:t}){return e.createElement(e.Fragment,null,n?n(t):J(t))}}const G=e=>e._def.typeName===f.ZodObject,H=e=>e._def.typeName===f.ZodArray;function J(n){return Array.isArray(n)?n.flatMap((e=>J(e))):"object"!=typeof n||null===n||e.isValidElement(n)?[n]:Object.values(n).reduce(((e,n)=>e.concat(J(n))),[])}export{B as createTsForm,y as createUniqueFieldSchema,A as useDateFieldInfo,D as useDescription,k as useEnumValues,x as useFieldInfo,K as useNumberFieldInfo,P as useReqDescription,R as useStringFieldInfo,V as useTsController};
