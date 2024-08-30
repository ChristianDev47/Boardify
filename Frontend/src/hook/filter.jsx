import { useContext } from "react";
import { FiltersContext } from "../context/filter.jsx";

export function useFilters() {
  const { filters, setFilters } = useContext(FiltersContext);

  const verifyDateTimeWeek = (date) => {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);
    const givenDate = new Date(date);
    return givenDate >= startOfWeek && givenDate <= endOfWeek;
  };

  const verifyDateDue = (date) => {
    const givenDate = new Date(date);
    const now = new Date();
    return givenDate < now;
  };

  const filterCards = (cards) => {
    return cards.filter((card) => {
      // Members
      if (filters.withoutMembers) {
        const newdata = card.members.filter((member) =>
          filters.selectedMembers.data.includes(member.member_id.id)
        );
        if (newdata.length > 0 || card.members.length === 0) {
          return ValidateDueDate(card);
        }
      }

      if (filters.withoutMembers && card.members.length === 0) {
        return ValidateDueDate(card);
      } else if (filters.withoutMembers && card.members.length !== 0) {
        return;
      } else if (
        filters.selectedMembers.data.length > 0
      ) {
        const newdata = card.members.filter((member) =>
          filters.selectedMembers.data.includes(member.member_id.id)
        );
        if (newdata.length > 0) {
          return ValidateDueDate(card);
        }
      } else {
        return ValidateDueDate(card);
      }
    });
  };

  const ValidateDueDate = (card) => {
    if (filters.withoutDate) {
      if (!card.due_date) {
        if (filters.completed) return ValidateCompleted(card);
        else if (filters.not_completed) return ValidateNotCompleted(card);
        else return ValidateList(card);
      } else return;
    }
    if (filters.due_this_week) {
      if (card.due_date) {
        if (
          verifyDateTimeWeek(card.due_date) &&
          !verifyDateDue(card.due_date)
        ) {
          if (filters.completed) return ValidateCompleted(card);
          else if (filters.not_completed) return ValidateNotCompleted(card);
          else return ValidateList(card);
        } else return;
      } else return;
    }
    if (filters.due) {
      if (card.due_date) {
        if (verifyDateDue(card.due_date)) {
          if (filters.completed) return ValidateCompleted(card);
          else if (filters.not_completed) return ValidateNotCompleted(card);
          else return ValidateList(card);
        } else return;
      } else return;
    }
    if (filters.completed) {
      return ValidateCompleted(card);
    }
    if (filters.not_completed) return ValidateNotCompleted(card);
    else return ValidateList(card);
  };

  const ValidateCompleted = (card) => {
    if (card.is_completed) {
      return ValidateList(card);
    } else return;
  };

  const ValidateNotCompleted = (card) => {
    if (!card.is_completed) {
      return ValidateList(card);
    } else return;
  };

  const ValidateList = (card) => {
    if (filters.selectedLists && filters.selectedLists.data.length === 0) {
      return card;
    } else if (filters.selectedLists.data.length > 0) {
      if (filters.selectedLists.data.includes(card.list_id._id)) {
        return card;
      }
    } else {
      return card;
    }
  };

  return { filters, filterCards, setFilters };
}
