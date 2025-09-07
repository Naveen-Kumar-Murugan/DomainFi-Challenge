import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Gavel } from "lucide-react";

interface BidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBid: (amount: string) => void;
  domain: string;
  currentBid: string;
  isProcessing: boolean;
}

const BidModal = ({ 
  isOpen, 
  onClose, 
  onBid, 
  domain, 
  currentBid, 
  isProcessing 
}: BidModalProps) => {
  const [bidAmount, setBidAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBid(bidAmount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-premium">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground font-poppins">
            Place Bid for {domain}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Current Bid: {currentBid}
            </label>
            <Input
              type="number"
              step="0.01"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter bid amount in ETH"
              className="bg-background/50 border-border/50"
            />
          </div>

          <Button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gradient-button hover:bg-gradient-button-hover text-primary-foreground font-semibold py-4"
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                <Gavel className="w-4 h-4 mr-2" />
                Confirm Bid
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BidModal;
