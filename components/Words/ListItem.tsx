import * as React from 'react';
import { List } from 'react-native-paper';

const ListItem = () => (
  <List.Item
    title="University"
    description="Универсальность"
    left={() => <List.Icon  icon="star-circle" />}
  />
);

export default ListItem;
