import React from 'react';
import {  Button, Fab } from 'native-base';
import { Icon} from '@ui-kitten/components'
const ButtonNativeBase = (Props)=>(
    <Fab
           
            {...Props}
            style={{ backgroundColor: 'orange' }}
            position="bottomLeft"
    >
                <Icon style={{color:'white',fontSize:40,width:30,height:30}}  name="plus-square-outline" />
  </Fab>
);

export default ButtonNativeBase