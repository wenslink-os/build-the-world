export function simulate(failures=[],policy={cache:true,localLogin:true,queue:true}){
 const down=new Set(failures),network=down.has('internet')||down.has('dns');
 const auth=network||down.has('auth'),payments=network||down.has('payments'),db=down.has('database');
 return [
  {feature:'Browse catalog',state:db||network?(policy.cache?'degraded':'unavailable'):'available',reason:db||network?'Cached data may be stale.':'Live data available.'},
  {feature:'Sign in',state:auth?(policy.localLogin?'degraded':'unavailable'):'available',reason:auth?'Only previously enrolled local users can sign in.':'Identity provider available.'},
  {feature:'Pay for an order',state:payments?'unavailable':'available',reason:payments?'Never show an unconfirmed payment as successful.':'Payment service available.'},
  {feature:'Save draft order',state:db||network?(policy.queue?'degraded':'unavailable'):'available',reason:db||network?'Local draft awaits idempotent sync.':'Draft saved to database.'}
 ];
}
