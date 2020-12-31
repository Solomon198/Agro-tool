import React from 'react'
import {Button,Icon} from '@ui-kitten/components';

const EvaButtons = (Prop)=>(
     <Button {...Prop}  icon={(styles)=><Icon {...styles} {...Prop}/>}>
         {Prop.text?Prop.text:""}
     </Button>
)

export default EvaButtons;