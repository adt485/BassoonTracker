UI.modalDialog = function(initialProperties){
    var me = UI.element();
    var text = "test";

    var properties = ["left","top","width","height","name","ok"];

    me.setProperties = function(p){

        properties.forEach(function(key){
            if (typeof p[key] != "undefined") me[key] = p[key];

            if (key == "ok"){
                console.error("ok");
            }
        });

        me.setSize(me.width,me.height);
        me.setPosition(me.left,me.top);

        var panelHeight = 200;
        if (me.height<panelHeight) panelHeight = me.height - 20;

        var panelWidth = Math.max(Math.floor(me.width/2),380);

        background.setSize(panelWidth,panelHeight);
        background.setPosition((me.width-panelWidth)/2,(me.height-panelHeight)/2);

        okButton.setPosition(background.left + (background.width/2) - 50,background.top + background.height - 40);

    };

    var background = UI.scale9Panel(0,0,me.width/2,200,UI.Assets.panelMainScale9);

    background.ignoreEvents = true;
    me.addChild(background);

    var okButton = UI.Assets.generate("buttonLight");
    okButton.setProperties({
        label: "OK",
        width: 100,
        height: 28
    });
    me.addChild(okButton);


    me.render = function(internal){
        internal = !!internal;

        if (this.needsRendering){

            me.ctx.fillStyle = "rgba(0,0,0,0.6)";
            me.ctx.fillRect(0,0,me.width,me.height);

            background.render();

            if (text){
                var lines = text.split("/");
                var textY = background.top + 20;
                var textX = background.left + 10;

                var maxWidth = background.width - 20;
                var fontWidth = 9; // TODO: get from font

                lines.forEach(function(line){
                    var textX = 10;
                    if (fontMed){
                        var textLength = line.length * fontWidth;
                        textX = background.left + 10 + Math.floor((maxWidth - textLength)/2);
                        fontMed.write(me.ctx,line,textX,textY,0);
                    }
                    textY += 12;
                });
            }

            if (me.ok) okButton.render();

        }
        this.needsRendering = false;

        if (internal){
            return me.canvas;
        }else{
            me.parentCtx.drawImage(me.canvas,me.left,me.top,me.width,me.height);
        }

    };

    me.setText = function(newText){
        text = newText;
    };

    me.getText= function(){
        return text;
    };

    me.close = function(){
        me.hide();
        if (me.onClose) me.onClose();
        UI.removeModalElement();
        delete me;
    };



    return me;
};