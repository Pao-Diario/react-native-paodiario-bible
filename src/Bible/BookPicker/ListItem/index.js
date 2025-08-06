import React, { useState } from "react";
import * as Styled from "./styles";
import { getBibleBookChapters } from "../../../services/bibleFunctions";
export default function ListItem({
  book,
  selected,
  onSelect,
  selectedChapter,
  ...props
}) {
  const [expanded, setExpanded] = useState(selected);
  const iconName = expanded ? "chevron-up" : "chevron-down";
  const bookChapters = expanded ? getBibleBookChapters(book) : null;
  const arrChapters = Array.from(Array(bookChapters).keys());

  return (
    <Styled.Area
      key={`pickerItem_${book.title}`}
      selected={expanded}
      onPress={() => {
        setExpanded(!expanded);
        if (!expanded) {
          onSelect(book);
        }
      }}
    >
      <Styled.RowBtn>
        <Styled.Title>{book.title}</Styled.Title>
        <Styled.IconArrow name={iconName} iconStyle="solid" />
      </Styled.RowBtn>
      {expanded && (
        <Styled.RowChapters>
          {arrChapters.map((chapters, index) => {
            const chapterNumber = index + 1;

            return (
              <Styled.ChapterButton
                key={`ChapterItem_${book.title}_${chapterNumber}`}
                selected={chapterNumber === selectedChapter && selected}
                onPress={() => {
                  onSelect({ ...book, chapter: chapterNumber });
                }}
              >
                <Styled.ChapterButtonText>
                  {chapterNumber}
                </Styled.ChapterButtonText>
              </Styled.ChapterButton>
            );
          })}
        </Styled.RowChapters>
      )}
    </Styled.Area>
  );
}
