/**
 * enables resizable data table columns.
 * Script by Ingo Hofmann
 */
(function($) {

    /**
     * Widget makes columns of a table resizable.
     */
    $.widget("ih.resizableColumns", {

        /**
         * initializing columns
         */
        _create: function() {
            this._initResizable();
        },


        refresh: function() {
            this._initResizable();
        },
        /**
         * init jQuery UI sortable
         */
        _initResizable: function() {

            var colElement, thElement, colWidth, originalSize, 
                originalTableSize, actualTableWidth, 
                updateTimeout, nextColWidth, 
                tempWidth = 80;

            var table = this.element;
            // this.element.find("th").resizable().resizable("destroy");

            this.element.find("th:not('.no-col-resize')").resizable({
                // use existing DIV rather than creating new nodes
                handles: {
                    "e": ".resizeHelper"
                },   
                
                // default min width in case there is no label
                minWidth: 80,
                
                // set min-width to label size
                create: function(event, ui) {
                    actualTableWidth = table.width();
                    var minWidth = $(this).find(".columnLabel").width();
                    if (minWidth) {
                        
                        // FF cannot handle absolute resizable helper
                        /*if ($.browser.mozilla) {
                            minWidth += $(this).find(".ui-resizable-e").width();
                        }*/
                        minWidth += $(this).find(".ui-resizable-e").width();
                        
                        $(this).resizable("option", "minWidth", minWidth);
                    }
                },

                // set correct COL element and original size
                start: function(event, ui) {
                    var colIndex = ui.helper.index() + 1;
                    colElement = table.find("colgroup > col:nth-child(" + colIndex + ")");
                    thElement = table.find("thead tr > th:nth-child(" + colIndex + ")");

                    colWidth = parseInt(colElement.get(0).style.width, 10); // faster than width
                    originalSize = ui.size.width;
                    originalTableSize = table.width();
                    nextColWidth  = thElement.next("th").width();
                },

                // set COL width
                resize: function(event, ui) {
                    
                    var resizeDelta = ui.size.width - originalSize;
                       var $this = $(this);
                    var newColWidth = colWidth + resizeDelta;

                    colElement.width(newColWidth);

                      if(nextColWidth - resizeDelta> 80){
                            thElement.next("th").width(nextColWidth - resizeDelta);
                            // tempWidth = thElement.width();
                        }else{                          
                            // event.stopPropagation();
                            // event.preventDefault();
                            //ui.element.resizable('destroy');
                        }
                    
                    var targetTdElements = table.find(".bulk-action-fixed-row").children("td");
                    if(targetTdElements.length > 0) {
                        table.find("th.ui-resizable").each(function(index) {
                            if(targetTdElements[index]) {
                                console.log('----->>> Th width - ', $(this).outerWidth());
                                $(targetTdElements[index]).width($(this).outerWidth());
                            }
                        });
                    }

                    // height must be set in order to prevent IE9 to set wrong height
                    $(this).css("height", "auto");
                },
                stop: function( event, ui ) { console.log("stop")}
            });
        }

    });

    // init resizable
    //$(".resizable").resizableColumns();
})(jQuery);