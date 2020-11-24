// Copyright (C) 2020, Flickering Inc. All rights reserved.
// Author: Roby (zhaochangkai@flickering.ai)

const { ccclass, property } = cc._decorator;

enum ShaderInfoType {
    S_WINDOWSIZE = 's_windowSize',
    S_OFFSET = 's_offset',
    S_TIME = 's_time',
}

@ccclass
export default class ShaderInfo extends cc.Component {
    _render: cc.RenderComponent = null;
    _material: cc.Material = null;
    _canvasCenter: cc.Vec2 = null;
    onLoad() {
        this._render = this.getComponent(cc.RenderComponent);
        this._material = this._render.getMaterial(0);
        this._material.setProperty(
            ShaderInfoType.S_WINDOWSIZE,
            cc.v2(cc.winSize.width, cc.winSize.height)
        );
        this._canvasCenter = cc.director
            .getScene()
            .getChildByName('Canvas')
            .convertToWorldSpaceAR(cc.v2(0, 0));

        console.log(cc.winSize.width, cc.winSize.height);

        let offset = this._calOffset();
        this._material.setProperty(ShaderInfoType.S_OFFSET, offset);

        this._render.setMaterial(0, this._material);
    }

    _calOffset() {
        let curNodeCenter = this.node.convertToWorldSpaceAR(cc.v2(0, 0));

        return cc.v2(
            ((curNodeCenter.x - this._canvasCenter.x) * 2) / cc.winSize.width,
            ((curNodeCenter.y - this._canvasCenter.y) * 2) / cc.winSize.height
        );
    }
    /**
     *  更新游戏时间
     */
    updateTime() {
        let t = cc.director.getTotalTime() / 1000;
        this._material.setProperty(ShaderInfoType.S_TIME, t);
        let offset = this._calOffset();
        this._material.setProperty(ShaderInfoType.S_OFFSET, offset);
        // this._render.setMaterial(0, this._material);
    }
    update(dt) {
        this.updateTime();
    }
}
