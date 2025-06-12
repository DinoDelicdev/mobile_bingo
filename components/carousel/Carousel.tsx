import { Colors } from '@/constants/Colors';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface CarouselProps {
  children: React.ReactNode;
  itemsPerInterval?: number;
}

/**
 * A reusable Carousel component that displays its children in a scrollable list
 * with pagination dots.
 * @param {object} props 
 */
const Carousel: React.FC<CarouselProps> = ({ children, itemsPerInterval = 1 }) => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<React.ReactNode>>(null);

  const itemWidth = containerWidth > 0 ? containerWidth / itemsPerInterval : 0;
  
  
  const data = React.Children.toArray(children);
  const numPages = Math.ceil(data.length / itemsPerInterval);

  
  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    if (width !== containerWidth) {
      setContainerWidth(width);
    }
  };

 
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (containerWidth === 0) return;
    const scrollPosition = event.nativeEvent.contentOffset.x;
    
    const index = Math.round(scrollPosition / containerWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };
  

  const renderItem = ({ item }: { item: React.ReactNode }) => {
    return (
      <View style={[styles.itemContainer, { width: itemWidth }]}>
        {item}
      </View>
    );
  };


  const keyExtractor = (item: React.ReactNode, index: number): string => {
    if (React.isValidElement(item) && item.key) {
      return item.key.toString();
    }
    return `carousel-item-${index}`;
  };


  const Pagination = () => (
    <View style={styles.paginationContainer}>
      {Array.from({ length: numPages }).map((_, i) => {
        const isActive = i === activeIndex;
        
        const activeDotStyle = isActive && itemsPerInterval > 1 ? styles.activeDotDash : {};
        return (
          <View
            key={`dot-${i}`}
            style={[styles.dot, isActive && styles.activeDot, activeDotStyle]}
          />
        );
      })}
    </View>
  );

  return (
    <View style={styles.container} onLayout={onLayout}>
      {containerWidth > 0 && (
        <>
          <FlatList
            ref={flatListRef}
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={containerWidth}
            decelerationRate="fast"
           
            onScroll={handleScroll}
            scrollEventThrottle={16} 
          />
 
          {numPages > 1 && <Pagination />}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto', 
  },
  itemContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#D1D5DB', 
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.bingo_main,
  },
  activeDotDash: {
    width: 40, 
  },
});

export default Carousel;
