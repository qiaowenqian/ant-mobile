import React from 'react'
export default class tagColor extends React.Component {
    static getTagColor(item) {
        if(item && item.color){
            return '#'+item.color
        }
        let color= '#7265e6';
        if(item){
            if(item.type!='1'){
                if(item.parentIds){
                    let pids =item.parentIds.charAt(item.parentIds.length-1);
                    if(isNaN(pids)){
                        color= '#fdbb78';
                    }else{
                        if(parseInt(pids)>4){
                             color= '#c8c4fc';
                        }else{
                            color= '#89c997';
                        }
                    }
                }else{
                    color= '#75ccff';
                }
            }
         }
        return color;                    
    }
    
    static getStringTagColor(item) {
        let color= '#7265e6';
        if(item){
            if(item.type!='1'){
                if(item){
                    let pids =item.id.substring(item.id.length-3);
                    color = '#'+pids;
                }else{
                    color= '#0000FF';
                }
            }
         }
        return color;                    
	}
}