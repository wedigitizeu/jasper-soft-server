define(["require","!domReady","underscore","resource.reportResourceNaming","jrs.configs","resource.base"],function(e){"use strict";var r=e("!domReady"),o=e("underscore"),s=e("resource.reportResourceNaming"),t=e("jrs.configs"),a=e("resource.base");r(function(){var e;"undefined"!=typeof t.addJasperReport.localContext&&(e=t.addJasperReport.localContext.initOptions,o.extend(window.localContext,t.addJasperReport.localContext)),o.extend(a.messages,t.addJasperReport.resource.messages),s.initialize(e),isIPad()&&a.initSwipeScroll()})});