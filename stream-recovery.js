/* Ten seconds of connection failure/buffering before trying another station.
 * Playback progress cancels the timer; hidden pages and explicit stops never skip.
 */
window.createStreamRecovery=function(media,options){
  let timer=0,generation=0,active=false,connecting=false,hasPlayed=false,automaticStart=false,attempted=new Set();
  const cancel=()=>{clearTimeout(timer);timer=0;};
  function stop(){cancel();active=false;connecting=false;generation++;}
  function arm(){
    if(!active||timer||document.hidden)return;
    const token=generation;
    timer=setTimeout(()=>{
      timer=0;if(!active||token!==generation||document.hidden)return;
      if(navigator.onLine===false){stop();options.notify('Connection offline. Press Play after reconnecting.');return;}
      const current=options.current();if(!current){stop();return;}
      if(!hasPlayed&&!automaticStart&&options.onInitialTimeout){
        stop();options.onInitialTimeout();return;
      }
      attempted.add(options.key(current));
      const rows=options.rows().filter(station=>!(location.protocol==='https:'&&/^http:\/\//i.test(String(station.url_resolved||station.url||'').trim()))),index=rows.findIndex(s=>options.key(s)===options.key(current));
      let next;
      for(let n=1;n<=rows.length;n++){const candidate=rows[(index+n+rows.length)%rows.length];if(!attempted.has(options.key(candidate))){next=candidate;break;}}
      stop();
      if(next){options.notify('Stream offline after 10 seconds, trying next...');options.play(next,true);}
      else{options.notify('No working station found. Press Play to retry.');}
    },10000);
  }
  media.addEventListener('playing',()=>{hasPlayed=true;connecting=false;cancel();});
  media.addEventListener('timeupdate',()=>{if(!media.paused&&media.readyState>=3){hasPlayed=true;connecting=false;cancel();}});
  for(const name of ['waiting','stalled','error'])media.addEventListener(name,()=>{if(active&&(connecting||!media.paused||media.error))arm();});
  media.addEventListener('pause',()=>{if(!connecting&&!media.error)stop();});
  media.addEventListener('play',()=>{if(!active){active=true;connecting=true;hasPlayed=false;automaticStart=false;attempted.clear();}arm();});
  document.addEventListener('visibilitychange',()=>{cancel();if(!document.hidden&&active&&(connecting||(!media.paused&&media.readyState<3)))arm();});
  return {stop,begin(automatic=false){stop();if(!automatic)attempted.clear();hasPlayed=false;automaticStart=automatic;active=true;connecting=true;arm();},fail(){if(active){connecting=true;arm();}},reject(error){if(error?.name==='NotAllowedError'||error?.name==='AbortError')stop();else if(active)arm();}};
};
