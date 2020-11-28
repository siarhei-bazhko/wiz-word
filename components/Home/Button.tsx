import React from "react";
import { Button as PaperButton } from 'react-native-paper';


export default function Button({ alignmentStyle, buttonTitle, iconType, disabled, fn, args } : any) {
  return (
    <PaperButton style={alignmentStyle} color="green" icon={iconType} disabled={disabled} onPress={() => fn(args)}>
      {buttonTitle}
    </PaperButton>
  );
}

