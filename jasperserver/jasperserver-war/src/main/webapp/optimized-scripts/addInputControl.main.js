define(["require","!domReady","resource.inputControl","underscore","jrs.configs","resource.base","utils.common"],function(e){"use strict";var o=e("!domReady"),n=e("resource.inputControl"),t=e("underscore"),r=e("jrs.configs"),s=e("resource.base");e("utils.common"),o(function(){var e=r.addInputControl.localContext.initOptions;t.extend(window.localContext,r.addInputControl.localContext),t.extend(s.messages,r.addInputControl.resource.messages),n.initialize(e),isIPad()&&s.initSwipeScroll()})});