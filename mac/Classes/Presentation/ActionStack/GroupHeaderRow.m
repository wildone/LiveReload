
#import "GroupHeaderRow.h"
#import "ATMacViewCreation.h"

@implementation GroupHeaderRow

- (NSDictionary *)metaInfo {
    return self.representedObject;
}

- (void)loadContent {
    [super loadContent];
    
    _titleLabel = [[NSTextField staticLabelWithString:self.metaInfo[@"title"]] addedToView:self];

    self.topMargin = 30.0;
    self.bottomMargin = 8.0;
}

@end


@implementation CompilersCategoryRow : GroupHeaderRow
@end


@implementation FiltersCategoryRow : GroupHeaderRow
@end
