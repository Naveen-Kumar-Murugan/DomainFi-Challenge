import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gavel } from "lucide-react";

interface CreateAuctionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAuction: (auctionData: {
    domainName: string;
    duration: string;
    category: string;
  }) => void;
  isProcessing: boolean;
}

const CreateAuctionModal = ({ 
  isOpen, 
  onClose, 
  onCreateAuction, 
  isProcessing 
}: CreateAuctionModalProps) => {
  const [domainName, setDomainName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('TECH');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateAuction({
      domainName,
      duration,
      category
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-premium">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground font-poppins">
            Create New Auction
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Domain Name
              </label>
              <Input
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                placeholder="example.com"
                className="bg-background/50 border-border/50"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Duration (hours)
              </label>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="24"
                className="bg-background/50 border-border/50"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Category
              </label>
              <Select 
                value={category} 
                onValueChange={setCategory}
              >
                <SelectTrigger className="bg-background/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TECH">Tech</SelectItem>
                  <SelectItem value="CRYPTO">Crypto</SelectItem>
                  <SelectItem value="FINANCE">Finance</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gradient-button hover:bg-gradient-button-hover text-primary-foreground font-semibold py-4"
          >
            {isProcessing ? (
              "Creating Auction..."
            ) : (
              <>
                <Gavel className="w-4 h-4 mr-2" />
                Create Auction
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAuctionModal;
