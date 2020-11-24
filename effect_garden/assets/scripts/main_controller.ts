// Copyright (C) 2020, Flickering Inc. All rights reserved.
// Author: Roby (zhaochangkai@flickering.ai)

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainController extends cc.Component {
    @property(cc.Button)
    background1: cc.Button = null;
    @property(cc.Button)
    loading1: cc.Button = null;
    @property(cc.Button)
    outline: cc.Button = null;
    @property(cc.Button)
    split: cc.Button = null;
    @property(cc.Node)
    showWindow: cc.Node = null;

    _curActiveNode: cc.Node = null;

    _show(name) {
        // background 1
        if (this._curActiveNode) {
            this._curActiveNode.active = false;
        }
        this._curActiveNode = this.showWindow.getChildByName(name);
        this._curActiveNode.active = true;
    }
    onEnable() {
        this.background1.node.on('click', () => {
            this._show(this.background1.node.name);
        });

        this.loading1.node.on('click', () => {
            this._show(this.loading1.node.name);
        });
        this.outline.node.on('click', () => {
            this._show(this.outline.node.name);
        });
        this.split.node.on('click', () => {
            this._show(this.split.node.name);
        });
    }

    start() {
        // console.log(this.showWindow.width, this.showWindow.height);
    }

    // update (dt) {}
}
