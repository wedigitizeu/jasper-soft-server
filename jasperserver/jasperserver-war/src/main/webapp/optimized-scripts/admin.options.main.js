define(["require","!domReady","administer.base","administer.options","jrs.configs","underscore"],function(e){"use strict";var i=e("!domReady"),s=e("administer.base"),n=e("administer.options"),t=e("jrs.configs"),o=e("underscore");i(function(){o.extend(s._messages,t.Administer._messages),s.urlContext=t.urlContext,s.flowExecutionKey=t.Administer.flowExecutionKey,n.initialize()})});