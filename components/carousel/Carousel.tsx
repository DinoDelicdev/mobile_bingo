import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, LayoutChangeEvent, StyleSheet, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
interface CarouselProps {
  children: React.ReactNode;
  itemsPerInterval?: number;
}

/**
 * A reusable Carousel component that displays its children in a scrollable list.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The components to be displayed as slides.
 * @param {number} [props.itemsPerInterval=1] - The number of items to display per carousel interval.
 */
const Carousel: React.FC<CarouselProps> = ({ children, itemsPerInterval = 1 }) => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const flatListRef = useRef<FlatList<React.ReactNode>>(null);

 
  const itemWidth = containerWidth > 0 ? containerWidth / itemsPerInterval : 0;

  
  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    if (width !== containerWidth) {
      setContainerWidth(width);
    }
  };

  const renderItem = ({ item }: { item: React.ReactNode }) => {
    return (
      <View style={[styles.itemContainer, { width: itemWidth }]}>
        {item}
      </View>
    );
  };

  
  const data = React.Children.toArray(children);


  const keyExtractor = (item: React.ReactNode, index: number): string => {
    if (React.isValidElement(item) && item.key) {
      return item.key.toString();
    }
    return `carousel-item-${index}`;
  };

  return (
    <View style={styles.carouselContainer} onLayout={onLayout}>
      {containerWidth > 0 && (
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          // REMOVED `pagingEnabled`. It conflicts with `snapToInterval` when displaying
          // more than one item at a time, causing inconsistent snapping behavior.
          // `snapToInterval` provides the correct functionality on its own.
          snapToInterval={itemWidth}
          decelerationRate="fast"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%', // Occupy the full width of the parent
    // The height of the carousel is determined by its content or the parent container.
    // For best performance, the parent of <Carousel> should have a defined height.
    height: 'auto',
  },
  itemContainer: {
    // The width is set dynamically
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Carousel;